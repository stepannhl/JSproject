

export const randomRange = (min, max) => min + Math.floor(Math.random() * (max - min));

export const randomArrayItem = (array) => {
    const index = randomRange(0, array.length);
    const item = array[index];

    return item;
}
