#!/bin/zsh
source .env
forge create --chain $CHAIN --etherscan-api-key $ETHERSCAN_API_KEY --private-key $PRIVATE_KEY --rpc-url $RPC_URL --constructor-args-path ./deployargs.txt LinkedUp

