import { BigInt } from "@graphprotocol/graph-ts";
import { AirdropDistributorCreated } from "../generated/FuulAirdropDistributorFactory/FuulAirdropDistributorFactory";
import { Distributor } from "../generated/schema";

import { FuulAirdropDistributor } from "../generated/templates";

export function handleAirdropDistributorCreated(
  event: AirdropDistributorCreated
): void {
  FuulAirdropDistributor.create(event.params.deployedAddress);

  const distributor = new Distributor(event.params.deployedAddress);
  distributor.participants = BigInt.fromI32(0);
  distributor.currency = event.params.currency;
  distributor.claimedAmount = BigInt.fromI32(0);
  distributor.totalClaims = BigInt.fromI32(0);
  distributor.amount = BigInt.fromI32(0);

  distributor.save();
}
