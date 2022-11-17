
export async function getJSON(url){
  return fetch(url)
        .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw Error(response.statusText);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getLocation = async (options)  => {
  return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};