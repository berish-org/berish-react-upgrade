import { UpgradeProvider } from "../provider";
import { UpgradeStepFromAction } from "../step";
import { UpgradeComponent } from "../upgrade";

export interface WrapperType<TProps = any> {
  <WrapperProps>(
    wrapperComponent: (
      provider: UpgradeProvider<TProps>
    ) => React.ComponentType<WrapperProps>,
    wrapperProps?: (provider: UpgradeProvider<TProps>) => WrapperProps
  ): UpgradeComponent<TProps>;
}

export const wrapper: UpgradeStepFromAction<WrapperType> = (
  wrapperComponent,
  wrapperPropsCallback
) => {
  return (Component, provider) => {
    const Wrapper = wrapperComponent(provider);
    const wrapperProps = wrapperPropsCallback(provider);

    return (props, context) => {
      return <Wrapper {...wrapperProps}>{Component(props, context)}</Wrapper>;
    };
  };
};
