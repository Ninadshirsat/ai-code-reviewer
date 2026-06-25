import { getGithubApp } from "@/features/github/utils/github-app";
import { PrFile } from "../types/review";

const FILES_PER_PAGE = 100;

/** Formats PR file patches into a markdown diff section for the review prompt. */
export function formatPrFilesForReview(files: PrFile[]): string {
  return files
    .map((file) => `### ${file.filePath}\n\`\`\`diff\n${file.patch}\n\`\`\``)
    .join("\n\n");
}

export async function getPullRequestFiles(
  installationId: number,
  repoFullName: string,
  prNumber: number,
): Promise<PrFile[]> {
  const app = getGithubApp();
  const octokit = await app.getInstallationOctokit(installationId);
  const [owner, repo] = repoFullName.split("/"); //taking out the repo name and owner name (distructuring it)

  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
    { owner, repo, pull_number: prNumber, per_page: FILES_PER_PAGE }, //sending unique data (per_page:- chunking size decide ho rhi hai )
  );

  const files: PrFile[] = [];

  for (const file of data) {
    if (!file.patch) {
      continue;
    }

    files.push({ filePath: file.filename, patch: file.patch });
  }

  return files;
}
