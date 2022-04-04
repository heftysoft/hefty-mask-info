export enum MaskActions {
  HIDE = "hide",
  MASK = "mask",
}

export type Options = {
  action: MaskActions;
  onlyFirstOccurrence?: boolean; // If true, the action desired is only applied to the first occurrence of the attribute
  substituteChar?: string; // Character to use for substitution [only if action is MaskActions.MASK]
  useSameLength?: boolean; // If true, then the replacing string will have the same length as the original value [only if action is MaskActions.MASK]
};
