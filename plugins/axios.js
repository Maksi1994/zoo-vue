export default function ({ $axios, redirect }) {

    $axios.onResponse(res => {
        return res.data;
    });
}
