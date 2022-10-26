type SubscribeFunction = (url?: string, options?: NavigateOptions) => void;

const subscribers: SubscribeFunction[] = [];

export function subscribe(fn: SubscribeFunction): void {
  subscribers.push(fn);
}

interface NavigateOptions {
  empty?: boolean;
  data?: any;
}

export function navigate(url?: string, options?: NavigateOptions): void {
  for (const fn of subscribers) {
    try {
      fn(url, options);
    } catch (error) {
      console.error("Navigate event subscriber threw an error");
      console.error(error);
    }
  }
}
