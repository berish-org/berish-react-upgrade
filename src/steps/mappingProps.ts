import { UpgradeProvider } from "../provider";
import { UpgradeStepFromAction } from "../step";
import { UpgradeComponent } from "../upgrade";

export interface MappingPropsType<TProps = any> {
  (
    callback?: (provider: UpgradeProvider<TProps>) => Partial<TProps>
  ): UpgradeComponent<TProps>;
}

export const mappingProps: UpgradeStepFromAction<MappingPropsType> = (
  callback
) => {
  return (component, provider) => {
    return (props, context) => {
      if (callback) {
        const newProps = callback(provider) || {};
        props = Object.assign({}, props, newProps);
      }
      return component(props, context);
    };
  };
};
