import { createBuilder } from "https://deno.land/x/denogent@v0.1.2/lib/core/builder.ts";
import { task } from "https://deno.land/x/denogent@v0.1.2/lib/core/task.ts";
import deno from "https://deno.land/x/denogent@v0.1.2/lib/deno/deno.ts";
import { DenoPermissions } from "https://deno.land/x/denogent@v0.1.2/lib/deno/args.ts";
import { createGitHubActions } from "https://deno.land/x/denogent@v0.1.2/lib/ci/github_actions/github_actions.ts";

const test = task('test')
    .does(async ctx => {
        await deno.test({
            logger: ctx?.logger,
            permissions: DenoPermissions.None
        });
    });

createBuilder({
    name: 'build',
    targetTasks: test,
    ciIntegrations: [
        createGitHubActions({
            image: 'ubuntu-latest'
        })
    ] // define CI integrations here
});