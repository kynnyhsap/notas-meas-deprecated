<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import SiApplepodcasts from 'svelte-icons-pack/si/SiApplepodcasts';

	import Time from 'svelte-time';
	import type { PodcastEpisodeNotes, BookHighlights } from '../../xata';

	interface WithCreatedAt {
		createdAt?: Date | null | undefined;
	}

	export let data: {
		podcastEpisodeNotes: PodcastEpisodeNotes[];
		bookHighlights: BookHighlights[];
	};

	const podcastNotes = data.podcastEpisodeNotes.slice(0, 100);

	function extractUniqueDaysFromNotes<T extends WithCreatedAt>(notes: T[]) {
		// extract individual days from notes and return them as an array of dates, sorted DESC
		const nonEmptyDates = notes.map((note) => note.createdAt).filter((d) => !!d) as Date[];
		const uniqueDates = nonEmptyDates
			.map((d) => new Date(d).setHours(0, 0, 0, 0))
			.filter((value, index, self) => self.indexOf(value) === index);

		const sortedDates = uniqueDates.sort((a, b) => b - a);

		return sortedDates.map((d) => new Date(d));
	}

	function getNotesForDay<T extends WithCreatedAt>(notes: T[], day: Date) {
		if (!notes || !notes.length) {
			return [];
		}

		return notes.filter((note) => {
			if (!note.createdAt) {
				return false;
			}

			const noteDate = new Date(note.createdAt);
			return (
				noteDate.getDate() === day.getDate() &&
				noteDate.getMonth() === day.getMonth() &&
				noteDate.getFullYear() === day.getFullYear()
			);
		});
	}

	$: uniqueDays = extractUniqueDaysFromNotes(podcastNotes);

	$: console.log(uniqueDays);
</script>

<div class="m-4">
	<ul>
		{#each uniqueDays as day}
			<h2 class="text-xl font-bold mt-8 mb-4"><Time timestamp={day} format="dddd, MMM D" /></h2>
			{#each getNotesForDay(podcastNotes, day) as note}
				<li>
					<h3 class="flex items-center gap-2">
						<Icon src={SiApplepodcasts} color="white" size="1.5em" />
						<span>
							<b>podcast note</b> at <Time timestamp={note.createdAt} format="HH:mm" />
						</span>
					</h3>
					<p class="border-l-2 border-l-gray-700 ml-3 p-4 my-2">{note.text}</p>
				</li>
			{/each}
		{/each}
	</ul>
</div>
