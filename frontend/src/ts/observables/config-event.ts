type SubscribeFunction = (
  key: string,
  newValue?: MonkeyTypes.ConfigValues,
  nosave?: boolean,
  previousValue?: MonkeyTypes.ConfigValues,
  fullConfig?: MonkeyTypes.Config
) => void;

const subscribers: SubscribeFunction[] = [];

export function subscribe(fn: SubscribeFunction): void {
  subscribers.push(fn);
}

export function dispatch(
  key: string,
  newValue?: MonkeyTypes.ConfigValues,
  nosave?: boolean,
  previousValue?: MonkeyTypes.ConfigValues,
  fullConfig?: MonkeyTypes.Config
): void {
  for (const fn of subscribers) {
    try {
      fn(key, newValue, nosave, previousValue, fullConfig);
    } catch (error) {
      console.error("Config event subscriber threw an error");
      console.error(error);
    }
  }
}
