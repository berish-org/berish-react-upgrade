import { UpgradeStepFromAction } from "../step";
import { UpgradeComponent } from "../upgrade";

export interface AddPropsType<TProps = any> {
  <NewProps extends { [key: string]: any }>(
    newProps: Partial<NewProps>
  ): UpgradeComponent<TProps & NewProps>;
}

export const addProps: UpgradeStepFromAction<AddPropsType> = (newProps) => {
  return (component, provider, stepIndex, currentStepIndex) => {
    if (newProps && !provider.defaultPropsRef.current[currentStepIndex]) {
      provider.defaultPropsRef.current[currentStepIndex] = newProps;
    }
    return component;
  };
};
