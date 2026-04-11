export async function getData() {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    console.log(data);
    return data;
}
