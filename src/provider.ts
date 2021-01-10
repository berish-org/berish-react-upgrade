import type { MutableRefObject } from 'react';

export interface UpgradeProvider<TProps> {
  getProps(): TProps;
  getOriginalProps(): TProps;
  setProps(props: Partial<TProps>): void;
  propsRef: MutableRefObject<Partial<TProps>>;
  defaultPropsRef: MutableRefObject<Partial<TProps>[]>;
}
