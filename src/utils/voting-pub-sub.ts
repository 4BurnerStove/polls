type Message = { pollOptionId: string, votes: number}
type Subscriber = (message: Message) => void

class VotingPubSub {
    private channels: Record<string, Subscriber[]> = {}

    subscribe(pollId: string, subcribe: Subscriber){
        if(!this.channels[pollId]){
            this.channels[pollId] = []
        }

        this.channels[pollId].push(subcribe)
    }
    
    publish(pollId: string, message: Message) {
        if(!this.channels[pollId]){
            return
        }

        for (const subcribe of this.channels[pollId]){
            subcribe(message)
        }
    }
}

export const voting = new VotingPubSub()