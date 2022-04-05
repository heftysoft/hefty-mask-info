export enum MaskActions {
  HIDE = "hide",
  MASK = "mask",
}

export type Options = {
  action: MaskActions;
  onlyFirstOccurrence?: boolean; // If true, the action desired is only applied to the first occurrence of the attribute
  substituteChar?: string; // Character to use for substitution [only if action is MaskActions.MASK]
  useSameLength?: boolean; // If true, then the replacing string will have the same length as the original value [only if action is MaskActions.MASK]
  maskTimePropsNormally?: boolean, // If true, then the time properties of Date objects will be masked normally
  maskFromRight?: boolean, // If true, then the replacing string will be masked from the right
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isMaskable?: (value: any) => boolean, // Function to determine if a value is maskable
};
