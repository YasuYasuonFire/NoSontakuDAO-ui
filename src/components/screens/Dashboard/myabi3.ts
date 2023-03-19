const abi = {
  "source": {
    "hash": "0x6869cb5ca2b8363bf9e5a0130b4741181294ff2bf6d933754a3fac59e73fe5d5",
    "language": "ink! 3.4.0",
    "compiler": "rustc 1.68.0-nightly"
  },
  "contract": {
    "name": "governor",
    "version": "0.1.0",
    "authors": [
      "yasuyasu"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "governance_token",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 8
              }
            },
            {
              "label": "quorum",
              "type": {
                "displayName": [
                  "u8"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "new",
          "payable": true,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [],
      "messages": [
        {
          "args": [
            {
              "label": "eval_token",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 8
              }
            }
          ],
          "docs": [],
          "label": "set_eval_token",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 15
          },
          "selector": "0x26b07ad8"
        },
        {
          "args": [
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 8
              }
            },
            {
              "label": "duration",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 10
              }
            },
            {
              "label": "description",
              "type": {
                "displayName": [
                  "String"
                ],
                "type": 9
              }
            }
          ],
          "docs": [],
          "label": "propose",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 15
          },
          "selector": "0xcb14b5b5"
        },
        {
          "args": [
            {
              "label": "proposal_id",
              "type": {
                "displayName": [
                  "ProposalId"
                ],
                "type": 1
              }
            },
            {
              "label": "vote",
              "type": {
                "displayName": [
                  "VoteType"
                ],
                "type": 17
              }
            },
            {
              "label": "eval",
              "type": {
                "displayName": [
                  "EvalType"
                ],
                "type": 18
              }
            }
          ],
          "docs": [],
          "label": "vote",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 15
          },
          "selector": "0x083be260"
        },
        {
          "args": [
            {
              "label": "proposal_id",
              "type": {
                "displayName": [
                  "ProposalId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "label": "execute",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 15
          },
          "selector": "0xd00ec894"
        },
        {
          "args": [
            {
              "label": "proposal_id",
              "type": {
                "displayName": [
                  "ProposalId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "label": "get_proposal_vote",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Option"
            ],
            "type": 19
          },
          "selector": "0x5c417b0c"
        },
        {
          "args": [
            {
              "label": "proposal_id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "label": "get_proposal",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Option"
            ],
            "type": 20
          },
          "selector": "0xba4dc5ec"
        },
        {
          "args": [
            {
              "label": "proposal_id",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 1
              }
            },
            {
              "label": "account_id",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 8
              }
            }
          ],
          "docs": [],
          "label": "has_voted",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 11
          },
          "selector": "0xb03e31b0"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "proposal_votes"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                "ty": 6
              }
            },
            "name": "proposals"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                "ty": 12
              }
            },
            "name": "votes"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                "ty": 1
              }
            },
            "name": "next_proposal_id"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                "ty": 3
              }
            },
            "name": "quorum"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                "ty": 8
              }
            },
            "name": "governance_token"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                "ty": 8
              }
            },
            "name": "eval_token"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                "ty": 8
              }
            },
            "name": "owner"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 4,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 2
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "against_votes",
                  "type": 3,
                  "typeName": "u8"
                },
                {
                  "name": "for_votes",
                  "type": 3,
                  "typeName": "u8"
                }
              ]
            }
          },
          "path": [
            "governor",
            "governor",
            "ProposalVote"
          ]
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 5,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "Key"
          ]
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 3
            }
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 4,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 7
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "to",
                  "type": 8,
                  "typeName": "AccountId"
                },
                {
                  "name": "description",
                  "type": 9,
                  "typeName": "String"
                },
                {
                  "name": "vote_start",
                  "type": 10,
                  "typeName": "Timestamp"
                },
                {
                  "name": "vote_end",
                  "type": 10,
                  "typeName": "Timestamp"
                },
                {
                  "name": "executed",
                  "type": 11,
                  "typeName": "bool"
                }
              ]
            }
          },
          "path": [
            "governor",
            "governor",
            "Proposal"
          ]
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 5,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "sequence": {
              "type": 3
            }
          }
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "primitive": "u64"
          }
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 4,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 13
            },
            {
              "name": "V",
              "type": 14
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "tuple": [
              1,
              8
            ]
          }
        }
      },
      {
        "id": 14,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 15,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 14
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 14
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 16,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "AmountShouldNotBeZero"
                },
                {
                  "index": 1,
                  "name": "DurationError"
                },
                {
                  "index": 2,
                  "name": "ProposalNotFound"
                },
                {
                  "index": 3,
                  "name": "ProposalAlreadyExecuted"
                },
                {
                  "index": 4,
                  "name": "VotePeriodEnded"
                },
                {
                  "index": 5,
                  "name": "AlreadyVoted"
                },
                {
                  "index": 6,
                  "name": "VotePeriodNotEnded"
                },
                {
                  "index": 7,
                  "name": "QuorumNotReached"
                },
                {
                  "index": 8,
                  "name": "TransferError"
                },
                {
                  "index": 9,
                  "name": "ProposalNotAccepted"
                },
                {
                  "index": 10,
                  "name": "CallerIsNotOwner"
                },
                {
                  "index": 11,
                  "name": "VoteIsWrong"
                },
                {
                  "index": 12,
                  "name": "EvalIsWrong"
                }
              ]
            }
          },
          "path": [
            "governor",
            "governor",
            "GovernorError"
          ]
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "Against"
                },
                {
                  "index": 1,
                  "name": "For"
                }
              ]
            }
          },
          "path": [
            "governor",
            "governor",
            "VoteType"
          ]
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "Against"
                },
                {
                  "index": 1,
                  "name": "For"
                }
              ]
            }
          },
          "path": [
            "governor",
            "governor",
            "EvalType"
          ]
        }
      },
      {
        "id": 19,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 2
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 2
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 20,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 7
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 7
            }
          ],
          "path": [
            "Option"
          ]
        }
      }
    ]
  }
};
export default abi;