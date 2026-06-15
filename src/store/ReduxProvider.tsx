"use client";

import { store } from "@/store";
import { useGetMeQuery, useRefreshTokenMutation } from "@/store/apis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, setCredentials, setLoading } from "@/store/slices/authSlice";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const refreshTokenState = useAppSelector((state) => state.auth.refreshToken);
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const { data: meResponse, isFetching: isMeFetching } = useGetMeQuery(undefined, {
    skip: !token,
  });
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const accessToken =
      typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null;
    const refreshToken =
      typeof window !== "undefined" ? window.localStorage.getItem("refreshToken") : null;

    if (!accessToken && !refreshToken) {
      dispatch(setLoading(false));
      return;
    }

    if (accessToken) {
      dispatch(
        setCredentials({
          user: {
            id: "",
            name: "",
            email: "",
            role: "admin",
          },
          token: accessToken,
          refreshToken,
        })
      );
      return;
    }

    if (refreshToken) {
      dispatch(setLoading(true));
      refreshTokenMutation({ refreshToken })
        .unwrap()
        .then((response) => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem("accessToken", response.data.accessToken);
            if (response.data.refreshToken) {
              window.localStorage.setItem("refreshToken", response.data.refreshToken);
            }
          }

          dispatch(
            setCredentials({
              user: response.data.user ?? {
                id: response.data.userId ?? "",
                name: "",
                email: "",
                role: "admin",
              },
              token: response.data.accessToken,
              refreshToken: response.data.refreshToken ?? refreshToken,
            })
          );
        })
        .catch(() => {
          dispatch(logout());
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
          }
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [dispatch, refreshTokenMutation]);

  useEffect(() => {
    if (!meResponse?.data) return;

    dispatch(
      setCredentials({
        user: {
          id: meResponse.data.email,
          name: meResponse.data.name,
          email: meResponse.data.email,
          role: "admin",
          avatar: meResponse.data.avatar,
        },
        token: token ?? "",
        refreshToken: refreshTokenState,
      })
    );
    dispatch(setLoading(false));
  }, [dispatch, meResponse, token, refreshTokenState]);

  useEffect(() => {
    dispatch(setLoading(isMeFetching));
  }, [dispatch, isMeFetching]);

  return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      {children}
    </Provider>
  );
}
