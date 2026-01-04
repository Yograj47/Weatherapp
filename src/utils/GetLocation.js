export default function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log({ lat, lon });
        resolve({ lat, lon });
      },
      (error) => {
        console.error("Geolocation error:", error);
        reject(error);
      }
    );
  });
}
