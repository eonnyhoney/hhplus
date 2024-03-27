let 구독자들 = {}
let currentCallback

const setCurrentCallback = callback => {
  currentCallback = callback

}

export const 구독 = fn => {
  setCurrentCallback(fn)
  return fn();
}

export const 발행기관 = obj => {
  this.상태 = obj;

  Object.keys(this.상태).forEach(key => {
    let _value = obj[key];
    구독자들[key] = new Set()
    Object.defineProperty(this.상태, key, {
      get() {
        구독자들[key].add(currentCallback)
        return _value;
      },
      set(newValue) {
        if (_value === newValue) return;
        _value = newValue;
        구독자들[key].forEach(fn => {
          fn();
        });
      }
    });
  })

  return this.상태
}
