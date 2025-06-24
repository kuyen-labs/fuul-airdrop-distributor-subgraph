import { AirdropDistributorCreated } from "../generated/FuulAirdropDistributorFactory/FuulAirdropDistributorFactory";

import { FuulAirdropDistributor } from "../generated/templates";

export function handleAirdropDistributorCreated(
  event: AirdropDistributorCreated
): void {
  FuulAirdropDistributor.create(event.params.deployedAddress);
}
