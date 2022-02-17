## Demo

![](/docs/demo.gif)

## Instructions
Using react-query to invalidate a query when there are new data events via websockets

To begin

1. `yarn install`
2. `yarn start`
3. Populate first data, run `yarn persist`. Run it again to append more data.
4. To see an existing data being updated. Run `yarn persist progress-init` and then run `yarn persist progress`.
You will see the progress attribute being updated in the UI.
5. Observe ability for data to be updated in the background while filtering data
