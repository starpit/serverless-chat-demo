composer.try(composer.sequence(p => ({text: p.utterance}),
                               'yoda',
                               p => ({utterance: p.contents.translated})),
             p => ({utterance: p.error.response.body.error.message}))
