import { useRef } from 'react';
import {
  mappingProps,
  MappingPropsType,
  onMount,
  OnMountType,
  onUnmount,
  OnUnmountType,
  WrapperType,
  wrapper,
  DeletePropsType,
  deleteProps,
  AddPropsType,
  addProps,
  useHook,
  UseHookType,
} from './steps';
import { pushStepFactory, UpgradeStep } from './step';
import { UpgradeProvider } from './provider';
import { useForceUpdate } from './useForceUpdate';

export interface UpgradeMethods<TProps> {
  addProps: AddPropsType<TProps>;
  onMount: OnMountType<TProps>;
  onUnmount: OnUnmountType<TProps>;
  mappingProps: MappingPropsType<TProps>;
  wrapper: WrapperType<TProps>;
  deleteProps: DeletePropsType<TProps>;
  useHook: UseHookType<TProps>;
}

export type UpgradeComponent<TProps> = UpgradeMethods<TProps> & React.FunctionComponent<TProps>;

export function upgrade<TProps>(Component: React.ComponentClass<TProps> | React.FunctionComponent<TProps>) {
  const defaultComponent: React.FunctionComponent<TProps> = (props: TProps) => <Component {...props} />;
  const steps: UpgradeStep<any>[] = [];

  const UpgradeComponent: UpgradeComponent<TProps> = (originalProps) => {
    const forceUpdate = useForceUpdate();
    const defaultPropsRef = useRef<Partial<TProps>[]>([]);
    const stateRef = useRef<Partial<TProps>>({});

    const provider: UpgradeProvider<TProps> = {
      getProps: () => ({
        ...defaultPropsRef.current.filter(Boolean).reduce((prev, current) => ({ ...prev, ...current }), {}),
        ...originalProps,
        ...stateRef.current,
      }),
      getOriginalProps: () => originalProps,
      setProps: (partialProps) => {
        stateRef.current = { ...stateRef.current, ...partialProps };
        forceUpdate();
      },
      propsRef: stateRef,
      defaultPropsRef: defaultPropsRef,
    };

    const RenderComponent = steps.reduce(
      (component, step, stepIndex) =>
        step(component, provider, stepIndex, steps.filter((m) => m.stepFactory === step.stepFactory).indexOf(step)),
      defaultComponent,
    );

    return <RenderComponent {...provider.getProps()} />;
  };

  const pushStep = pushStepFactory(UpgradeComponent, steps);

  UpgradeComponent.addProps = pushStep(addProps);
  UpgradeComponent.onMount = pushStep(onMount);
  UpgradeComponent.onUnmount = pushStep(onUnmount);
  UpgradeComponent.mappingProps = pushStep(mappingProps);
  UpgradeComponent.wrapper = pushStep(wrapper);
  UpgradeComponent.deleteProps = pushStep(deleteProps);
  UpgradeComponent.useHook = pushStep(useHook);

  return UpgradeComponent;
}
