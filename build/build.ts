import { createBuilder } from "https://deno.land/x/denogent/lib/core/builder.ts";
import { task } from "https://deno.land/x/denogent/lib/core/task.ts";
import deno from "https://deno.land/x/denogent/lib/deno/deno.ts";
import { createGitHubActions } from "https://deno.land/x/denogent/lib/ci/gh-actions/gh-actions.ts";
import { DenoPermissions } from "https://deno.land/x/denogent/lib/deno/args.ts";

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