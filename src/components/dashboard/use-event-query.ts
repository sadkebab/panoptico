import { DataRange, EventList, GroupedData } from "@/_data/events";
import { useQuery } from "@tanstack/react-query";

export function useGroupedEventQuery<T = any>(event: string, range: DataRange) {
  const queryKey = ['chart', range, event, 'grouped']
  return {
    ...useQuery({
      queryKey: queryKey,
      queryFn: () =>
        fetch(`api/events/${event}/${range}/grouped`).then(
          (res) => res.json() as Promise<GroupedData<T>>,
        )
    }),
    queryKey
  }
}

export function useEventQuery<T = any>(event: string, range: DataRange) {
  const queryKey = ['chart', range, event]
  return {
    ...useQuery({
      queryKey: queryKey,
      queryFn: () =>
        fetch(`api/events/${event}/${range}`).then(
          (res) => res.json() as Promise<EventList<T>>,
        )
    }),
    queryKey
  }
}