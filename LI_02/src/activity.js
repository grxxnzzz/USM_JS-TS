const activityEl = document.querySelector("i#activity");
const errorEl = document.querySelector("b#error");

/**
 * Gets json object from boredapi and returns activity string from it.
 * @returns {string}
 */
async function getRandomActivity() {
  let activity;
  let promise = fetch("https://www.boredapi.com/api/activity/")
    .then((response) => response.json())
    .then((data) => {
      return data.activity;
    })
    .catch(() => {
      console.log("Cannot retrieve data from boredAPI");
    });

  activity = await promise;
  return activity;
}


/**
 * Updates activity on activityElement that answers for showcasing new activities.
 * @param {string} activity
 * @returns {any}
 */
function updateActivity(activity) {
    activityEl.textContent = activity;
}

/**
 * Refreshes activityElement every minute through updateActivity().
 * @returns {any}
 */
async function updateEveryMinute() {
    while (true) {
        let activity = await getRandomActivity();
        updateActivity(activity);
        await new Promise(onResolve => setTimeout(onResolve, 60000));
        console.log("60000ms timed out, updated");
      }
}