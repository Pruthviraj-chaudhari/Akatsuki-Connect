async function fetchProfilePhoto(profileLink) {
  try {
    let url;

    // Check if the URL includes a protocol, if not, prepend "https://"
    if (!profileLink.startsWith("https://")) {
      url = new URL(`https://${profileLink}`);
    } else {
      url = new URL(profileLink);
    }

    const githubUsername = url.pathname.split("/")[1];

    if (!githubUsername) {
      console.error("Invalid GitHub profile link");
      return null;
    }

    const response = await fetch(
      `https://api.github.com/users/${githubUsername}`
    );

    if (response.ok) {
      const { avatar_url } = await response.json();
      return avatar_url;
    } else {
      console.error(
        `Error: Unable to fetch data. Status code: ${response.status}`
      );
      return null;
    }
  } catch (error) {
    console.error(`Unexpected error: ${error}`);
    return null;
  }
}

export default fetchProfilePhoto;
