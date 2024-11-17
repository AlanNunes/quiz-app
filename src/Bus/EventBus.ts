export interface AnswerFeedbackEvent {
  isCorrect: boolean;
  message: string;
}

export interface TimerEvent {
  isTimeUp: boolean
}

interface EventListener {
  on(
    event: string,
    callback: (this: void, e: CustomEvent<AnswerFeedbackEvent>) => void
  ): void;
  dispatch(event: string, data: AnswerFeedbackEvent): void;
  remove(
    event: string,
    callback: (this: void, e: CustomEvent<AnswerFeedbackEvent>) => void
  ): void;
}

interface TimerEventListener {
  on(
    event: string,
    callback: (this: void, e: CustomEvent<TimerEvent>) => void
  ): void;
  dispatch(event: string, data: TimerEvent): void;
  remove(
    event: string,
    callback: (this: void, e: CustomEvent<TimerEvent>) => void
  ): void;
}

export const eventBus: EventListener = {
  on(event, callback) {
    document.addEventListener(event, (e: Event) =>
      callback(e as CustomEvent<AnswerFeedbackEvent>)
    );
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, (e: Event) =>
      callback(e as CustomEvent<AnswerFeedbackEvent>)
    );
  },    
};

export const timerEventBus: TimerEventListener = {
  on(event, callback) {
    document.addEventListener(event, (e: Event) =>
      callback(e as CustomEvent<TimerEvent>)
    );
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, (e: Event) =>
      callback(e as CustomEvent<TimerEvent>)
    );
  },
};