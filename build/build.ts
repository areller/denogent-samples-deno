import { createBuilder, deno, DenoPermissions, task, createGitHubActions } from "https://deno.land/x/denogent@v0.1.8/mod.ts";

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