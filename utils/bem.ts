export function createBem(blockName: string, styles: Record<string, string>) {
  return (element?: string | null, modifier?: string) => {
    let key = blockName;

    if (element && modifier) {
      key = `${blockName}__${element} ${blockName}__${element}_${modifier}`;
    } else if (element) {
      key = `${blockName}__${element}`;
    } else if (modifier) {
      key = `${blockName}_${modifier}`;
    }

    // Разделяем классы если их несколько
    return key
      .split(' ')
      .map((k) => styles[k] || '')
      .filter(Boolean)
      .join(' ');
  };
}
