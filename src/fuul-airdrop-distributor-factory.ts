import { BigInt } from "@graphprotocol/graph-ts";
import { AirdropDistributorCreated } from "../generated/FuulAirdropDistributorFactory/FuulAirdropDistributorFactory";
import { Distributor, DurationPenalty } from "../generated/schema";

import {
  FuulAirdropDistributor,
  FuulAirdropDistributorWithDuration,
} from "../generated/templates";

export function handleAirdropDistributorCreated(
  event: AirdropDistributorCreated
): void {
  const distributorAddress = event.params.deployedAddress;

  const distributor = new Distributor(event.params.deployedAddress);
  distributor.participants = BigInt.fromI32(0);
  distributor.currency = event.params.currency;
  distributor.claimedAmount = BigInt.fromI32(0);
  distributor.totalClaims = BigInt.fromI32(0);
  distributor.amount = BigInt.fromI32(0);
  distributor.claimingWithoutStakingPercentagePenalty =
    event.params.claimingWithoutStakingPercentagePenalty;

  if (event.params.durationPenalty.length > 0) {
    FuulAirdropDistributorWithDuration.create(event.params.deployedAddress);

    const penalties = event.params.durationPenalty;
    for (let i = 0; i < penalties.length; i++) {
      const penalty = penalties[i];

      const durationId = `${distributorAddress
        .toHexString()
        .toLowerCase()}-${penalty.duration.toString()}`;

      const duration = new DurationPenalty(durationId);
      duration.duration = penalty.duration;
      duration.penalty = penalty.penalty;
      duration.save();
    }
  } else {
    FuulAirdropDistributor.create(event.params.deployedAddress);
  }

  distributor.save();
}
