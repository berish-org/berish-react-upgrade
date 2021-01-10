import { useEffect } from "react";
import { UpgradeProvider } from "../provider";
import { UpgradeStepFromAction } from "../step";
import { UpgradeComponent } from "../upgrade";

export interface OnMountType<TProps = any> {
  (
    callback: (provider: UpgradeProvider<TProps>) => any
  ): UpgradeComponent<TProps>;
}

export const onMount: UpgradeStepFromAction<OnMountType> = (callback) => {
  return (component, provider, stepIndex, currentStepIndex) => {
    useEffect(() => callback(provider), []);
    return component;
  };
};
