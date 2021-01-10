import { UpgradeProvider } from "../provider";
import { UpgradeStepFromAction } from "../step";
import { UpgradeComponent } from "../upgrade";

export interface UseHookType<TProps = any> {
  (
    callback: (provider: UpgradeProvider<TProps>) => any
  ): UpgradeComponent<TProps>;
}

export const useHook: UpgradeStepFromAction<UseHookType> = (callback) => {
  return (component, provider) => {
    callback(provider);

    return component;
  };
};
