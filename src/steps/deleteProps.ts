import { UpgradeStepFromAction } from "../step";
import { UpgradeComponent } from "../upgrade";

export interface DeletePropsType<TProps = any> {
  <Keys extends keyof TProps>(...keys: Keys[]): UpgradeComponent<
    Omit<TProps, Keys>
  >;
}

export const deleteProps: UpgradeStepFromAction<DeletePropsType> = (
  ...keys
) => {
  return (component, provider) => {
    return (props: any, context) => {
      if (keys && keys.length > 0) {
        props = keys.reduce((props, key) => {
          if (props[key]) {
            props[key] = void 0;
          }
          return props;
        }, Object.assign({}, props));
      }
      return component(props, context);
    };
  };
};
