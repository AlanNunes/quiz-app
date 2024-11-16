export interface AnswerEvent {
  isCorrect: boolean;
}

interface EventListener {
  on(
    event: string,
    callback: (this: void, e: CustomEvent<AnswerEvent>) => void
  ): void;
  dispatch(event: string, data: AnswerEvent): void;
  remove(
    event: string,
    callback: (this: void, e: CustomEvent<AnswerEvent>) => void
  ): void;
}

export const eventBus: EventListener = {
  on(event, callback) {
    document.addEventListener(event, (e: Event) =>
      callback(e as CustomEvent<AnswerEvent>)
    );
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, (e: Event) =>
      callback(e as CustomEvent<AnswerEvent>)
    );
  },
};