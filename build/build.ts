import { createBuilder, deno, DenoPermissions, task } from "https://deno.land/x/denogent@v0.1.7/lib/mod.ts";
import { createGitHubActions } from "https://deno.land/x/denogent@v0.1.7/lib/ci/gh-actions/mod.ts";

const test = task('test')
    .does(async ctx => {
        await deno.test({
            logger: ctx?.logger,
            permissions: DenoPermissions.All
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