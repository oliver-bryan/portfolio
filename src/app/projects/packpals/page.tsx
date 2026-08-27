import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const description =
  "A crowd-support platform for students moving between states. Sole designer and developer, Final Year Project at UiTM Shah Alam.";

export const metadata: Metadata = {
  title: "PackPals",
  description,
  alternates: { canonical: "/projects/packpals" },
  openGraph: {
    // A case study is an article, not a site section.
    type: "article",
    title: "PackPals · Oliver Bryan",
    description,
    url: "/projects/packpals",
    // opengraph-image.tsx only covers its own segment, so nested routes have to
    // point at it explicitly or they ship with no card image at all.
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PackPals · Oliver Bryan",
    description,
    images: ["/opengraph-image"],
  },
};

/**
 * Screenshots live in `public/images/packpals/`. Width and height are the real
 * pixel dimensions of each file, so the box is reserved before the image loads.
 */
type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

const screenshots = {
  requestForms: {
    src: "/images/packpals/request-forms.png",
    width: 4721,
    height: 4647,
    alt: "Student request forms for transport, accommodation and storage, collecting location, dates, budget, luggage size and preferences.",
    caption:
      "The student side: a relocation request captures location, dates, budget, luggage size and preferences.",
  },
  hostListingForms: {
    src: "/images/packpals/host-listing-forms.png",
    width: 3265,
    height: 3827,
    alt: "Host listing forms describing the transport, accommodation and storage a host can offer.",
    caption: "The host side: what a verified host can offer, and on what terms.",
  },
  availableMatches: {
    src: "/images/packpals/available-matches.png",
    width: 3041,
    height: 3248,
    alt: "Ranked list of available matches, each with a match quality bar showing a percentage score, alongside a listing detail screen.",
    caption:
      "Results sorted best first. The match quality bar is the computed score, shown as a percentage rather than hidden behind the ranking.",
  },
  hostVerification: {
    src: "/images/packpals/host-verification.png",
    width: 909,
    height: 2597,
    alt: "Host verification flow showing identity card capture and the on-device liveness check prompting for a blink and a smile.",
    caption:
      "Identity card capture plus an on-device liveness check, submitted for administrator review.",
  },
  messagesChat: {
    src: "/images/packpals/messages-chat.png",
    width: 2645,
    height: 2598,
    alt: "Conversation list and an open chat thread with text messages, a shared photo and a live location share.",
    caption:
      "Real-time chat with photo sharing and live location, because agreeing on the exact pickup point is most of the friction.",
  },
  confirmBookingStatus: {
    src: "/images/packpals/confirm-booking-status.png",
    width: 2008,
    height: 2724,
    alt: "Booking confirmation screen and a booking status screen showing the current stage of a booking.",
    caption:
      "Booking status moves through draft, matching, booked, confirmed, completed and cancelled.",
  },
  rateReview: {
    src: "/images/packpals/rate-review.png",
    width: 1080,
    height: 2224,
    alt: "Rate and review screen where a student scores a completed booking and leaves written feedback.",
    caption:
      "Ratings are submitted here, but the average is computed in a Cloud Function rather than on the device.",
  },
} satisfies Record<string, Screenshot>;

function Figure({ src, width, height, alt, caption }: Screenshot) {
  return (
    <figure>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes="(min-width: 900px) 832px, 100vw"
        className="h-auto w-full rounded-[4px] border border-[var(--border)] bg-[var(--surface)]"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function PackPalsPage() {
  return (
    <article className="shell page longform">
      <header>
        <h1>PackPals</h1>
        <p className="text-[length:var(--text-lg)] leading-[var(--leading-snug)]">
          <strong>
            A mobile platform that connects out-of-state university students
            with verified local hosts for transport, short-term accommodation
            and storage.
          </strong>
        </p>

        <dl>
          <dt>Role</dt>
          <dd>Sole designer and developer</dd>

          <dt>Timeline</dt>
          <dd>Final Year Project, UiTM Shah Alam</dd>

          <dt>Stack</dt>
          <dd>Flutter, Dart, Firebase, Cloud Functions, ML Kit, Google Places API</dd>
        </dl>
      </header>

      <section>
        <h2>The problem</h2>
        <p>
          Every semester, thousands of Malaysian students move hundreds of
          kilometres for university. Students from Sabah and Sarawak are hit
          hardest: median household income in those states sits at RM4,890 and
          RM5,504 against a national median of RM7,017, while living costs in
          Selangor and Kuala Lumpur run RM1,500 to RM2,500 a month.
        </p>
        <p>
          The cost is only half of it. The other half is that nobody coordinates
          any of this. Students arrange rides, temporary rooms and box storage
          through WhatsApp groups, Facebook posts and word of mouth, usually
          during registration week when they know the fewest people. The
          information is scattered, often out of date and impossible to compare.
          There is no way to tell whether the person offering you a ride is
          trustworthy.
        </p>
        <p>
          I wanted to know whether a single app could replace that scramble with
          something structured and verifiable.
        </p>
      </section>

      <section>
        <h2>What I built</h2>
        <p>
          PackPals is an Android app with two sides. Students post a relocation
          request specifying location, dates, budget, luggage size and
          preferences. Hosts, who are verified local students, alumni and small
          operators, list what they can offer. The app matches the two.
        </p>

        <Figure {...screenshots.requestForms} />
        <Figure {...screenshots.hostListingForms} />

        <p>The core flows:</p>

        <section>
          <h3>Request and match</h3>
          <p>
            A student submits a request for transport, accommodation or storage.
            The app runs it through a matching class specific to that service
            type, applies hard filters to drop listings that physically cannot
            serve the request, then scores what survives on location overlap,
            budget fit and preference alignment. Results are sorted best first
            with a match quality bar showing the computed score as a percentage,
            so the student can see <em>why</em> a host ranks where it does
            instead of trusting an opaque list.
          </p>

          <Figure {...screenshots.availableMatches} />
        </section>

        <section>
          <h3>Trust</h3>
          <p>
            Hosts submit identity card captures and complete an on-device
            liveness check that requires a blink and a smile before submission.
            An administrator reviews and approves. Verified hosts carry a badge,
            and ratings are aggregated server-side in a Cloud Function so nobody
            can inflate their own score.
          </p>

          <Figure {...screenshots.hostVerification} />
        </section>

        <section>
          <h3>Coordination</h3>
          <p>
            Real-time chat with text, photo sharing and live location, since
            most of the friction in a pickup is agreeing on where exactly to
            meet. Booking status moves through draft, matching, booked,
            confirmed, completed and cancelled. Push notifications via FCM keep
            both sides current when the app is closed.
          </p>

          <Figure {...screenshots.messagesChat} />
          <Figure {...screenshots.confirmBookingStatus} />
        </section>
      </section>

      <section>
        <h2>Decisions worth explaining</h2>

        <section>
          <h3>Filter first, then rank</h3>
          <p>
            Early on I ranked every listing by fit score alone. That surfaced
            hosts who scored well on price and location but had a car too small
            for the luggage. Splitting the pipeline into a feasibility gate
            followed by a preference ranking fixed it. Impossible matches never
            reach the student at all.
          </p>
        </section>

        <section>
          <h3>Showing the score</h3>
          <p>
            Match quality is displayed as a percentage with badges for Best
            Match, Best Value and Top Pick. In a trust-sensitive context, a
            number the user can interrogate beats a black box. Testers picked up
            on this immediately.
          </p>
        </section>

        <section>
          <h3>Server-side aggregation</h3>
          <p>
            Rating averages are computed in Cloud Functions rather than on the
            client. It is a small architectural choice with a large integrity
            payoff, and it was the right call the moment I thought about who has
            an incentive to lie.
          </p>

          <Figure {...screenshots.rateReview} />
        </section>

        <section>
          <h3>A race condition I had to chase</h3>
          <p>
            Booking confirmation had a timing bug where names could resolve
            inconsistently under concurrent writes. I fixed it with a
            self-healing name pattern rather than papering over it, which meant
            understanding what Firestore was actually doing rather than
            guessing.
          </p>
        </section>
      </section>

      <section>
        <h2>Results</h2>
        <p>
          Eight participants from both user groups, students and hosts, ran
          through the full request and listing flow in person and completed a
          System Usability Scale questionnaire.
        </p>
        <p>
          <strong>Average SUS score: 86.25.</strong> Individual scores ranged
          from 82.5 to 90. That lands in the A+ band, the top of the scale.
        </p>
        <p>
          The number is encouraging but I would not oversell it. Eight
          participants at a single point in time measures perceived usability,
          not whether the platform actually reduces relocation cost or stress.
          That would need a longitudinal study across full academic cycles.
        </p>
      </section>

      <section>
        <h2>What I would do differently</h2>

        <section>
          <h3>Payments sit outside the app</h3>
          <p>
            Students and hosts settle privately, which leaves no transaction
            record and no dispute protection. An FPX or Touch &apos;n Go
            integration was out of scope but is the most obvious gap.
          </p>
        </section>

        <section>
          <h3>Verification does not scale</h3>
          <p>
            A human approves every host. That works at prototype size and
            becomes a bottleneck immediately after. The document authenticity
            check needs to be automated.
          </p>
        </section>

        <section>
          <h3>Two-sided cold start</h3>
          <p>
            The platform is only as useful as its host supply, and I tested
            inside one university on Android only. Coverage across campuses and
            devices is unproven.
          </p>
        </section>

        <p>
          Naming these is not a formality. Each one is a design constraint I now
          understand better than I did when I started.
        </p>
      </section>

      <section>
        <h2>Stack</h2>

        <div className="bleed overflow-x-auto">
          <table>
            <caption>Technology used at each layer of PackPals.</caption>
            <thead>
              <tr>
                <th scope="col">Layer</th>
                <th scope="col">Technology</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Frontend</th>
                <td>Flutter, Dart</td>
              </tr>
              <tr>
                <th scope="row">Auth</th>
                <td>Firebase Authentication with mandatory email verification</td>
              </tr>
              <tr>
                <th scope="row">Database</th>
                <td>Cloud Firestore, real-time sync</td>
              </tr>
              <tr>
                <th scope="row">Storage</th>
                <td>Firebase Cloud Storage</td>
              </tr>
              <tr>
                <th scope="row">Server logic</th>
                <td>Cloud Functions (Node.js)</td>
              </tr>
              <tr>
                <th scope="row">Push</th>
                <td>Firebase Cloud Messaging</td>
              </tr>
              <tr>
                <th scope="row">Face detection</th>
                <td>Google ML Kit</td>
              </tr>
              <tr>
                <th scope="row">Location</th>
                <td>Google Places API, Geolocator</td>
              </tr>
              <tr>
                <th scope="row">Design</th>
                <td>Canva, Draw.io</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Built following the Mobile Application Development Life Cycle across
          identification, design, development and testing phases.
        </p>
      </section>

      <footer className="mt-[var(--space-2xl)] border-t border-[var(--border)] pt-[var(--space-l)]">
        <p className="text-[var(--accent-strong)]">
          <Link href="/projects">
            <span aria-hidden="true">&larr;</span> All projects
          </Link>
        </p>
      </footer>
    </article>
  );
}
