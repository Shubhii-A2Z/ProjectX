import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

import mailQueue from "@/queues/mail.queue";

const bullServerAdapter = new ExpressAdapter();

// Setting base path for Bull-board UI
bullServerAdapter.setBasePath("/ui");

// Registering "mailQueue" with Bull-board
createBullBoard({
    queues: [
        new BullMQAdapter(mailQueue),
    ],
    serverAdapter: bullServerAdapter,
});

export default bullServerAdapter;