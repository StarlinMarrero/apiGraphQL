import { Arg, Args, Ctx, Mutation, PubSub, Query, Resolver, Root, Subscription } from "type-graphql";



@Resolver()
export class Ping{


    @Subscription(()=> String, {
        topics: "NOTIFICATIONS"
        // filter: ({ payload, args }) => args.priorities.includes(payload.priority),
      })
    newNotification(@Arg("text") text: string){
        return {
            message: text,
          date: new Date(),
        };
      }

      @Mutation(() => Boolean)
      async addNewComment(@Arg("comment") input: String, @PubSub() pubSub: any) {
      
        const payload: any = { message: input };
        await pubSub.publish("NOTIFICATIONS", payload);
        return true;
      }
      

    // @Query(()=> String)
    // async hello(@Ctx() ctx: any){

    //     await ctx.req.pubsub.publish('MESSAGES');

    //     return "Hello World"
    // }

    // @Subscription(() => String, {
    //     topics: "MESSAGES"
    // })
    // async subscription(@Ctx() ctx: any): Promise<any> {
    //     return "something";
    // }


}