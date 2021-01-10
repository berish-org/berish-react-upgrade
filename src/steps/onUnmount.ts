import { useEffect } from "react";
import { UpgradeProvider } from "../provider";
import { UpgradeStepFromAction } from "../step";
import { UpgradeComponent } from "../upgrade";

export interface OnUnmountType<TProps = any> {
  (
    callback: (provider: UpgradeProvider<TProps>) => any
  ): UpgradeComponent<TProps>;
}

export const onUnmount: UpgradeStepFromAction<OnUnmountType> = (callback) => {
  return (component, provider) => {
    useEffect(() => () => callback(provider), []);
    return component;
  };
};
