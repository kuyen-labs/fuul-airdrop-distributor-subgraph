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

    event.params.durationPenalty.forEach((x, i) => {
      const duration = new DurationPenalty(
        `${event.params.deployedAddress
          .toHexString()
          .toLowerCase()}-${x.duration.toString()}`
      );
      duration.duration = x.duration;
      duration.penalty = x.penalty;
      duration.save();
    });
  } else {
    FuulAirdropDistributor.create(event.params.deployedAddress);
  }

  distributor.save();
}
