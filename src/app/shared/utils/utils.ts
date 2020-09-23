

export function expand(el: any, complete?: Function) {
  el.style = 'height: auto; opacity: 0;';
  const h = el.offsetHeight;
  el.style = 'height: 0px; opacity: 0;';
  setTimeout(() => el.style = 'height: ' + h + 'px; opacity: 1;', 50);
  setTimeout(() => {
    el.style.height = 'auto';
    if (complete) complete();
  }, 350);
}

export function collapse(el: any, complete?: Function) {
  const h = el.offsetHeight;
  el.style = 'height: ' + h + 'px; opacity: 1;';
  setTimeout(() => el.style = 'height: 0px; opacity: 0;', 50);
  if (complete) setTimeout(complete, 310);
}

export function toDict(apiService: any, string: string): {
  keys: () => string[],
  values: () => string[]
} {
  const dict: any = {
    keys: function () {
      return Object.keys(this).filter(i => i !== 'keys' && i !== 'values');
    },
    values: function () {
      return Object.values(this).filter(i => typeof i === 'string');
    }
  };
  apiService.transform(string).split(',').map((i: string) => {
    dict[i.split(':')[0]] = i.split(':')[1];
  });
  return dict;
}

