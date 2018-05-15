export interface IActionCreatorType<T> {
  type: string;
  payload?: T;
}

export function actionCreator<T>(type: string) {
  return (payload?: T) => ({
    type,
    payload
  });
}
