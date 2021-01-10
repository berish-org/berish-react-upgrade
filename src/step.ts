import { UpgradeProvider } from './provider';
import { UpgradeComponent } from './upgrade';

export interface UpgradeStep<TProps> {
  (
    component: React.FunctionComponent<TProps>,
    provider: UpgradeProvider<TProps>,
    stepIndex: number,
    currentTypeStepIndex: number,
  ): React.FunctionComponent<TProps>;
  stepFactory?: StepFactory<TProps>;
}

export type UpgradeStepFromAction<TAction> = TAction extends (...args: infer TArgs) => UpgradeComponent<infer TProps>
  ? (...args: TArgs) => UpgradeStep<TProps>
  : TAction;

export interface StepFactory<TProps> {
  (...args: any[]): UpgradeStep<TProps>;
}

export function pushStepFactory<TProps>(upgradeComponent: UpgradeComponent<TProps>, steps: UpgradeStep<TProps>[]) {
  return (stepFactory: StepFactory<TProps>): ((...args: any[]) => UpgradeComponent<TProps>) => {
    return (...args: any[]) => {
      const step = stepFactory(...args);
      step.stepFactory = stepFactory;
      steps.push(step);
      return upgradeComponent;
    };
  };
}
