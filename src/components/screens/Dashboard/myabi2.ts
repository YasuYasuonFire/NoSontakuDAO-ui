const abi = {
  "source": {
    "hash": "0x0caf528a0ee0be7b6d0544c78b4763d98e2cffddf12c1e04d4796c208787e9af",
    "language": "ink! 3.4.0",
    "compiler": "rustc 1.68.0-nightly"
  },
  "contract": {
    "name": "eval_token",
    "version": "2.2.0",
    "authors": [
      "Supercolony <green.baneling@supercolony.net>"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "name",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 21
              }
            },
            {
              "label": "symbol",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 21
              }
            },
            {
              "label": "decimal",
              "type": {
                "displayName": [
                  "u8"
                ],
                "type": 4
              }
            },
            {
              "label": "account",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 2
              }
            }
          ],
          "docs": [],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [],
      "messages": [
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "psp22_external",
                  "AllowanceInput1"
                ],
                "type": 2
              }
            },
            {
              "label": "spender",
              "type": {
                "displayName": [
                  "psp22_external",
                  "AllowanceInput2"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " Returns the amount which `spender` is still allowed to withdraw from `owner`.",
            "",
            " Returns `0` if no allowance has been set `0`."
          ],
          "label": "PSP22::allowance",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22_external",
              "AllowanceOutput"
            ],
            "type": 0
          },
          "selector": "0x4d47d921"
        },
        {
          "args": [
            {
              "label": "spender",
              "type": {
                "displayName": [
                  "psp22_external",
                  "DecreaseAllowanceInput1"
                ],
                "type": 2
              }
            },
            {
              "label": "delta_value",
              "type": {
                "displayName": [
                  "psp22_external",
                  "DecreaseAllowanceInput2"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Atomically decreases the allowance granted to `spender` by the caller.",
            "",
            " An `Approval` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns `InsufficientAllowance` error if there are not enough tokens allowed",
            " by owner for `spender`.",
            "",
            " Returns `ZeroSenderAddress` error if sender's address is zero.",
            "",
            " Returns `ZeroRecipientAddress` error if recipient's address is zero."
          ],
          "label": "PSP22::decrease_allowance",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22_external",
              "DecreaseAllowanceOutput"
            ],
            "type": 22
          },
          "selector": "0xfecb57d5"
        },
        {
          "args": [
            {
              "label": "from",
              "type": {
                "displayName": [
                  "psp22_external",
                  "TransferFromInput1"
                ],
                "type": 2
              }
            },
            {
              "label": "to",
              "type": {
                "displayName": [
                  "psp22_external",
                  "TransferFromInput2"
                ],
                "type": 2
              }
            },
            {
              "label": "value",
              "type": {
                "displayName": [
                  "psp22_external",
                  "TransferFromInput3"
                ],
                "type": 0
              }
            },
            {
              "label": "data",
              "type": {
                "displayName": [
                  "psp22_external",
                  "TransferFromInput4"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Transfers `value` tokens on the behalf of `from` to the account `to`",
            " with additional `data` in unspecified format.",
            "",
            " This can be used to allow a contract to transfer tokens on ones behalf and/or",
            " to charge fees in sub-currencies, for example.",
            "",
            " On success a `Transfer` and `Approval` events are emitted.",
            "",
            " # Errors",
            "",
            " Returns `InsufficientAllowance` error if there are not enough tokens allowed",
            " for the caller to withdraw from `from`.",
            "",
            " Returns `InsufficientBalance` error if there are not enough tokens on",
            " the the account Balance of `from`.",
            "",
            " Returns `ZeroSenderAddress` error if sender's address is zero.",
            "",
            " Returns `ZeroRecipientAddress` error if recipient's address is zero."
          ],
          "label": "PSP22::transfer_from",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22_external",
              "TransferFromOutput"
            ],
            "type": 22
          },
          "selector": "0x54b3c76e"
        },
        {
          "args": [
            {
              "label": "spender",
              "type": {
                "displayName": [
                  "psp22_external",
                  "IncreaseAllowanceInput1"
                ],
                "type": 2
              }
            },
            {
              "label": "delta_value",
              "type": {
                "displayName": [
                  "psp22_external",
                  "IncreaseAllowanceInput2"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Atomically increases the allowance granted to `spender` by the caller.",
            "",
            " An `Approval` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns `ZeroSenderAddress` error if sender's address is zero.",
            "",
            " Returns `ZeroRecipientAddress` error if recipient's address is zero."
          ],
          "label": "PSP22::increase_allowance",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22_external",
              "IncreaseAllowanceOutput"
            ],
            "type": 22
          },
          "selector": "0x96d6b57a"
        },
        {
          "args": [
            {
              "label": "to",
              "type": {
                "displayName": [
                  "psp22_external",
                  "TransferInput1"
                ],
                "type": 2
              }
            },
            {
              "label": "value",
              "type": {
                "displayName": [
                  "psp22_external",
                  "TransferInput2"
                ],
                "type": 0
              }
            },
            {
              "label": "data",
              "type": {
                "displayName": [
                  "psp22_external",
                  "TransferInput3"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Transfers `value` amount of tokens from the caller's account to account `to`",
            " with additional `data` in unspecified format.",
            "",
            " On success a `Transfer` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns `InsufficientBalance` error if there are not enough tokens on",
            " the caller's account Balance.",
            "",
            " Returns `ZeroSenderAddress` error if sender's address is zero.",
            "",
            " Returns `ZeroRecipientAddress` error if recipient's address is zero."
          ],
          "label": "PSP22::transfer",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22_external",
              "TransferOutput"
            ],
            "type": 22
          },
          "selector": "0xdb20f9f5"
        },
        {
          "args": [],
          "docs": [
            " Returns the total token supply."
          ],
          "label": "PSP22::total_supply",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22_external",
              "TotalSupplyOutput"
            ],
            "type": 0
          },
          "selector": "0x162df8c2"
        },
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "psp22_external",
                  "BalanceOfInput1"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " Returns the account Balance for the specified `owner`.",
            "",
            " Returns `0` if the account is non-existent."
          ],
          "label": "PSP22::balance_of",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22_external",
              "BalanceOfOutput"
            ],
            "type": 0
          },
          "selector": "0x6568382f"
        },
        {
          "args": [
            {
              "label": "spender",
              "type": {
                "displayName": [
                  "psp22_external",
                  "ApproveInput1"
                ],
                "type": 2
              }
            },
            {
              "label": "value",
              "type": {
                "displayName": [
                  "psp22_external",
                  "ApproveInput2"
                ],
                "type": 0
              }
            }
          ],
          "docs": [
            " Allows `spender` to withdraw from the caller's account multiple times, up to",
            " the `value` amount.",
            "",
            " If this function is called again it overwrites the current allowance with `value`.",
            "",
            " An `Approval` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns `ZeroSenderAddress` error if sender's address is zero.",
            "",
            " Returns `ZeroRecipientAddress` error if recipient's address is zero."
          ],
          "label": "PSP22::approve",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22_external",
              "ApproveOutput"
            ],
            "type": 22
          },
          "selector": "0xb20f1bbd"
        },
        {
          "args": [
            {
              "label": "role",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "GrantRoleInput1"
                ],
                "type": 14
              }
            },
            {
              "label": "account",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "GrantRoleInput2"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " Grants `role` to `account`.",
            "",
            " On success a `RoleGranted` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns with `MissingRole` error if caller can't grant the role.",
            " Returns with `RoleRedundant` error `account` has `role`."
          ],
          "label": "AccessControl::grant_role",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "accesscontrol_external",
              "GrantRoleOutput"
            ],
            "type": 24
          },
          "selector": "0x4ac062fd"
        },
        {
          "args": [
            {
              "label": "role",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "HasRoleInput1"
                ],
                "type": 14
              }
            },
            {
              "label": "address",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "HasRoleInput2"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " Returns `true` if `account` has been granted `role`."
          ],
          "label": "AccessControl::has_role",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "accesscontrol_external",
              "HasRoleOutput"
            ],
            "type": 26
          },
          "selector": "0xc1d9ac18"
        },
        {
          "args": [
            {
              "label": "role",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "GetRoleAdminInput1"
                ],
                "type": 14
              }
            }
          ],
          "docs": [
            " Returns the admin role that controls `role`. See `grant_role` and `revoke_role`."
          ],
          "label": "AccessControl::get_role_admin",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "accesscontrol_external",
              "GetRoleAdminOutput"
            ],
            "type": 14
          },
          "selector": "0x83da3bb2"
        },
        {
          "args": [
            {
              "label": "role",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "RevokeRoleInput1"
                ],
                "type": 14
              }
            },
            {
              "label": "account",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "RevokeRoleInput2"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " Revokes `role` from `account`.",
            "",
            " On success a `RoleRevoked` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns with `MissingRole` error if caller can't grant the `role` or if `account` doesn't have `role`."
          ],
          "label": "AccessControl::revoke_role",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "accesscontrol_external",
              "RevokeRoleOutput"
            ],
            "type": 24
          },
          "selector": "0x6e4f0991"
        },
        {
          "args": [
            {
              "label": "role",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "RenounceRoleInput1"
                ],
                "type": 14
              }
            },
            {
              "label": "account",
              "type": {
                "displayName": [
                  "accesscontrol_external",
                  "RenounceRoleInput2"
                ],
                "type": 2
              }
            }
          ],
          "docs": [
            " Revokes `role` from the calling account.",
            " Roles are often managed via `grant_role` and `revoke_role`: this function's",
            " purpose is to provide a mechanism for accounts to lose their privileges",
            " if they are compromised (such as when a trusted device is misplaced).",
            "",
            " On success a `RoleRevoked` event is emitted.",
            "",
            " # Errors",
            "",
            " Returns with `InvalidCaller` error if caller is not `account`.",
            " Returns with `MissingRole` error if `account` doesn't have `role`."
          ],
          "label": "AccessControl::renounce_role",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "accesscontrol_external",
              "RenounceRoleOutput"
            ],
            "type": 24
          },
          "selector": "0xeaf1248a"
        },
        {
          "args": [
            {
              "label": "account",
              "type": {
                "displayName": [
                  "psp22burnable_external",
                  "BurnInput1"
                ],
                "type": 2
              }
            },
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "psp22burnable_external",
                  "BurnInput2"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "PSP22Burnable::burn",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22burnable_external",
              "BurnOutput"
            ],
            "type": 22
          },
          "selector": "0x7a9da510"
        },
        {
          "args": [
            {
              "label": "account",
              "type": {
                "displayName": [
                  "psp22mintable_external",
                  "MintInput1"
                ],
                "type": 2
              }
            },
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "psp22mintable_external",
                  "MintInput2"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "PSP22Mintable::mint",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22mintable_external",
              "MintOutput"
            ],
            "type": 22
          },
          "selector": "0xfc3c75d4"
        },
        {
          "args": [],
          "docs": [
            " Returns the token symbol."
          ],
          "label": "PSP22Metadata::token_symbol",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22metadata_external",
              "TokenSymbolOutput"
            ],
            "type": 21
          },
          "selector": "0x34205be5"
        },
        {
          "args": [],
          "docs": [
            " Returns the token decimals."
          ],
          "label": "PSP22Metadata::token_decimals",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22metadata_external",
              "TokenDecimalsOutput"
            ],
            "type": 4
          },
          "selector": "0x7271b782"
        },
        {
          "args": [],
          "docs": [
            " Returns the token name."
          ],
          "label": "PSP22Metadata::token_name",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "psp22metadata_external",
              "TokenNameOutput"
            ],
            "type": 21
          },
          "selector": "0x3d261bd4"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "cell": {
                        "key": "0xf232311200000000000000000000000000000000000000000000000000000000",
                        "ty": 0
                      }
                    },
                    "name": "supply"
                  },
                  {
                    "layout": {
                      "cell": {
                        "key": "0xf332311200000000000000000000000000000000000000000000000000000000",
                        "ty": 1
                      }
                    },
                    "name": "balances"
                  },
                  {
                    "layout": {
                      "cell": {
                        "key": "0xf432311200000000000000000000000000000000000000000000000000000000",
                        "ty": 7
                      }
                    },
                    "name": "allowances"
                  },
                  {
                    "layout": {
                      "enum": {
                        "dispatchKey": "0xf532311200000000000000000000000000000000000000000000000000000000",
                        "variants": {
                          "0": {
                            "fields": [
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0xf632311200000000000000000000000000000000000000000000000000000000",
                                    "ty": 11
                                  }
                                },
                                "name": null
                              }
                            ]
                          },
                          "1": {
                            "fields": []
                          }
                        }
                      }
                    },
                    "name": "_reserved"
                  }
                ]
              }
            },
            "name": "psp22"
          },
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "enum": {
                        "dispatchKey": "0x89ae8e4b00000000000000000000000000000000000000000000000000000000",
                        "variants": {
                          "0": {
                            "fields": [
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0x8aae8e4b00000000000000000000000000000000000000000000000000000000",
                                    "ty": 12
                                  }
                                },
                                "name": null
                              }
                            ]
                          },
                          "1": {
                            "fields": []
                          }
                        }
                      }
                    },
                    "name": "name"
                  },
                  {
                    "layout": {
                      "enum": {
                        "dispatchKey": "0x8aae8e4b00000000000000000000000000000000000000000000000000000000",
                        "variants": {
                          "0": {
                            "fields": [
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0x8bae8e4b00000000000000000000000000000000000000000000000000000000",
                                    "ty": 12
                                  }
                                },
                                "name": null
                              }
                            ]
                          },
                          "1": {
                            "fields": []
                          }
                        }
                      }
                    },
                    "name": "symbol"
                  },
                  {
                    "layout": {
                      "cell": {
                        "key": "0x8bae8e4b00000000000000000000000000000000000000000000000000000000",
                        "ty": 4
                      }
                    },
                    "name": "decimals"
                  },
                  {
                    "layout": {
                      "enum": {
                        "dispatchKey": "0x8cae8e4b00000000000000000000000000000000000000000000000000000000",
                        "variants": {
                          "0": {
                            "fields": [
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0x8dae8e4b00000000000000000000000000000000000000000000000000000000",
                                    "ty": 11
                                  }
                                },
                                "name": null
                              }
                            ]
                          },
                          "1": {
                            "fields": []
                          }
                        }
                      }
                    },
                    "name": "_reserved"
                  }
                ]
              }
            },
            "name": "metadata"
          },
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "cell": {
                        "key": "0x75b08c5a00000000000000000000000000000000000000000000000000000000",
                        "ty": 13
                      }
                    },
                    "name": "admin_roles"
                  },
                  {
                    "layout": {
                      "struct": {
                        "fields": [
                          {
                            "layout": {
                              "cell": {
                                "key": "0x2779f6fc00000000000000000000000000000000000000000000000000000000",
                                "ty": 17
                              }
                            },
                            "name": "members"
                          },
                          {
                            "layout": {
                              "enum": {
                                "dispatchKey": "0x2879f6fc00000000000000000000000000000000000000000000000000000000",
                                "variants": {
                                  "0": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "cell": {
                                            "key": "0x2979f6fc00000000000000000000000000000000000000000000000000000000",
                                            "ty": 11
                                          }
                                        },
                                        "name": null
                                      }
                                    ]
                                  },
                                  "1": {
                                    "fields": []
                                  }
                                }
                              }
                            },
                            "name": "_reserved"
                          }
                        ]
                      }
                    },
                    "name": "members"
                  },
                  {
                    "layout": {
                      "enum": {
                        "dispatchKey": "0x76b08c5a00000000000000000000000000000000000000000000000000000000",
                        "variants": {
                          "0": {
                            "fields": [
                              {
                                "layout": {
                                  "cell": {
                                    "key": "0x77b08c5a00000000000000000000000000000000000000000000000000000000",
                                    "ty": 11
                                  }
                                },
                                "name": null
                              }
                            ]
                          },
                          "1": {
                            "fields": []
                          }
                        }
                      }
                    },
                    "name": "_reserved"
                  }
                ]
              }
            },
            "name": "access"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 5
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 2
            },
            {
              "name": "V",
              "type": 0
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 3,
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
        "id": 3,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 4
            }
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "sequence": {
              "type": 6
            }
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "tuple": [
              2,
              0
            ]
          }
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 9
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 8
            },
            {
              "name": "V",
              "type": 0
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "tuple": [
              2,
              2
            ]
          }
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "sequence": {
              "type": 10
            }
          }
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "tuple": [
              8,
              0
            ]
          }
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "sequence": {
              "type": 4
            }
          }
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 15
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 14
            },
            {
              "name": "V",
              "type": 14
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 14,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 15,
        "type": {
          "def": {
            "sequence": {
              "type": 16
            }
          }
        }
      },
      {
        "id": 16,
        "type": {
          "def": {
            "tuple": [
              14,
              14
            ]
          }
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 19
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 18
            },
            {
              "name": "V",
              "type": 11
            }
          ],
          "path": [
            "openbrush_lang",
            "storage",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "tuple": [
              14,
              2
            ]
          }
        }
      },
      {
        "id": 19,
        "type": {
          "def": {
            "sequence": {
              "type": 20
            }
          }
        }
      },
      {
        "id": 20,
        "type": {
          "def": {
            "tuple": [
              18,
              11
            ]
          }
        }
      },
      {
        "id": 21,
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
                      "type": 12
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
              "type": 12
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 22,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 23
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
              "type": 11
            },
            {
              "name": "E",
              "type": 23
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 23,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 12,
                      "typeName": "String"
                    }
                  ],
                  "index": 0,
                  "name": "Custom"
                },
                {
                  "index": 1,
                  "name": "InsufficientBalance"
                },
                {
                  "index": 2,
                  "name": "InsufficientAllowance"
                },
                {
                  "index": 3,
                  "name": "ZeroRecipientAddress"
                },
                {
                  "index": 4,
                  "name": "ZeroSenderAddress"
                },
                {
                  "fields": [
                    {
                      "type": 12,
                      "typeName": "String"
                    }
                  ],
                  "index": 5,
                  "name": "SafeTransferCheckFailed"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "psp22",
            "PSP22Error"
          ]
        }
      },
      {
        "id": 24,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 25
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
              "type": 11
            },
            {
              "name": "E",
              "type": 25
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 25,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "InvalidCaller"
                },
                {
                  "index": 1,
                  "name": "MissingRole"
                },
                {
                  "index": 2,
                  "name": "RoleRedundant"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "access_control",
            "AccessControlError"
          ]
        }
      },
      {
        "id": 26,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      }
    ]
  }
};
export default abi;