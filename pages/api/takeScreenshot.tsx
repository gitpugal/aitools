import { NextApiRequest, NextApiResponse } from "next";
import captureWebsite from "capture-website";
import fetch from "node-fetch";

const gitlabApiUrl = "https://gitlab.com/api/v4"; // Update with your GitLab instance URL
const repoPath = "pugalarasan_git/test"; // Update with your GitLab namespace and repository name
const accessToken = "glpat-UAVvcVfY_vmnQCn5GLMJ"; // Update with your GitLab access token

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // Capture screenshot and save it to the local directory
    // await captureWebsite.file(
    //   "https://sindresorhus.com",
    //   "public/assets/screenshot.png"
    // );

    // Commit and push the changes to the GitLab repository using GitLab API
    const apiUrl = `${gitlabApiUrl}/projects/${encodeURIComponent(
      repoPath
    )}/repository/files/public%2Fassets%2Fscreenshot.png`;

    const fileContent = require("fs")
      .readFileSync("public/assets/screenshot.png")
      .toString("base64");

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "PRIVATE-TOKEN": accessToken,
      },
      body: JSON.stringify({
        branch: "master", // Update with your branch name
        content: fileContent,
        commit_message: "Add screenshot.png",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error: ${errorText}`);
      return res
        .status(500)
        .json({ message:errorText });
    }

    res
      .status(200)
      .json("Screenshot captured and pushed to GitLab successfully.");
  } catch (error) {
    console.error("Error capturing and storing the screenshot: ", error);
    res.status(500).json({ message: "hi" });
  }
}
