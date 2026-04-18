export const COMMON_ERRORS = {
  required: () => 'Поле обязательно для заполнения',
  minlength: (err: { requiredLength: number; actualLength: number }) => `Минимум ${err.requiredLength} символов`
};
