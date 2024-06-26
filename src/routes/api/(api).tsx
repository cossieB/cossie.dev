import "./github.scss"

export default function ApiMainPage() {
    return (
        <main class="markdown-body">
            <h1><a id="microservices" class="anchor" aria-hidden="true" href="#microservices"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Documentation</h1>
            <ul>
                <li>
                    <a href="#microservices">Documentation</a>
                    <ul>
                        <li>
                            <a href="#who-am-i">Who Am I?</a>
                            <ul>
                                <li><a href="#who-am-i-request">Who Am I? Request</a></li>
                                <li><a href="#who-am-i-response">Who Am I? Response</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#timestamp">Timestamp</a>
                            <ul>
                                <li><a href="#timestamp-request">Timestamp Request</a></li>
                                <li><a href="#timestamp-response">Timestamp Response</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#url-shortener">URL Shortener</a>
                            <ul>
                                <li><a href="#url-shortener-request">URL Shortener Request</a></li>
                                <li><a href="#url-shortener-response">URL Shortener Response</a></li>
                            </ul>
                        </li>
                        {/* <li>
                            <a href="#file-metadata">File Metadata</a>
                            <ul>
                                <li><a href="#file-metadata-request">File Metadata Request</a></li>
                                <li><a href="#file-metadata-response">File Metadata Response</a></li>
                            </ul>
                        </li> */}
                        <li>
                            <a href="#quotes-as-a-service">Quotes As A Service</a>
                            <ul>
                                <li><a href="#quotes-request">Quotes Request</a></li>
                                <li><a href="#quotes-response">Quotes Response</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#exercise-tracker">Exercise Tracker</a>
                            <ul>
                                <li><a href="#create-user-request">Create User Request</a></li>
                                <li><a href="#create-user-response">Create User Response</a></li>
                                <li><a href="#create-exercise-request">Create Exercise Request</a></li>
                                <li><a href="#create-exercise-response">Create Exercise Response</a></li>
                                <li><a href="#get-exercise-logs-request">Get Exercise Logs Request</a></li>
                                <li><a href="#exercise-logs-response">Exercise Logs Response</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#metric--imperial-converter">Metric / Imperial Converter</a>
                            <ul>
                                <li><a href="#converter-request">Converter Request</a></li>
                                <li><a href="#converter-response">Converter Response</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#british--american-translator">British / American Translator</a>
                            <ul>
                                <li><a href="#translator-request">Translator Request</a></li>
                                <li><a href="#translator-response">Translator Response</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#issue-tracker">Issue Tracker</a>
                            <ul>
                                <li><a href="#add-issue-request">Add Issue Request</a></li>
                                <li><a href="#add-issue-response">Add Issue Response</a></li>
                                <li><a href="#update-issue-request">Update Issue Request</a></li>
                                <li><a href="#update-issue-response">Update Issue Response</a></li>
                                <li><a href="#delete-issue-request">Delete Issue Request</a></li>
                                <li><a href="#delete-issue-response">Delete Issue Response</a></li>
                                <li><a href="#get-issues-request">Get Issues Request</a></li>
                                <li><a href="#get-issues-response">Get Issues Response</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <h2><a id="who-am-i" class="anchor" aria-hidden="true" href="#who-am-i"><span aria-hidden="true"
                class="octicon octicon-link"></span></a>Who Am I?</h2>
            <h3><a id="who-am-i-request" class="anchor" aria-hidden="true" href="#who-am-i-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Who Am I? Request</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">GET</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">whoami</span></pre>
            </div>
            <h3><a id="who-am-i-response" class="anchor" aria-hidden="true" href="#who-am-i-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Who Am I? Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">ipaddress</span>: <span class="pl-s">"::1"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">language</span>: <span class="pl-s">"en-US,en;q=0.9"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">software</span>: <span class="pl-s">"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h2><a id="timestamp" class="anchor" aria-hidden="true" href="#timestamp"><span aria-hidden="true"
                class="octicon octicon-link"></span></a>Timestamp</h2>
            <h3><a id="timestamp-request" class="anchor" aria-hidden="true" href="#timestamp-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Timestamp Request</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">GET</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">timestamp</span><span class="pl-c1">/</span>:<span class="pl-s1">date</span>?</pre>
            </div>
            <h3><a id="timestamp-response" class="anchor" aria-hidden="true" href="#timestamp-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Timestamp Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-s">"unix"</span>: <span class="pl-c1">1</span><span class="pl-kos">,</span>
                    <span class="pl-s">"utc"</span>: <span class="pl-s">"Thu, 01 Jan 1970 00:00:00 GMT"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Johannesburg"</span>: <span class="pl-s">"1970/01/01, 02:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"New_York"</span>: <span class="pl-s">"1969/12/31, 19:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Los_Angeles"</span>: <span class="pl-s">"1969/12/31, 16:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Chicago"</span>: <span class="pl-s">"1969/12/31, 18:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"London"</span>: <span class="pl-s">"1970/01/01, 01:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Paris"</span>: <span class="pl-s">"1970/01/01, 01:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Berlin"</span>: <span class="pl-s">"1970/01/01, 01:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Sydney"</span>: <span class="pl-s">"1970/01/01, 10:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Toronto"</span>: <span class="pl-s">"1969/12/31, 19:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Shanghai"</span>: <span class="pl-s">"1970/01/01, 08:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Tokyo"</span>: <span class="pl-s">"1970/01/01, 09:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Sao_Paulo"</span>: <span class="pl-s">"1969/12/31, 21:00:00"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"Lagos"</span>: <span class="pl-s">"1970/01/01, 01:00:00"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">400</span> <span class="pl-v">Bad</span> <span class="pl-v">Request</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">error</span>: <span class="pl-s">"Invalid Date"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h2><a id="url-shortener" class="anchor" aria-hidden="true" href="#url-shortener"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>URL Shortener</h2>
            <h3><a id="url-shortener-request" class="anchor" aria-hidden="true" href="#url-shortener-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>URL Shortener Request</h3>
            <form class="single-form" action="/api/url" method="post">
                <input type="text" name="original" id="original" placeholder="Enter URL" />
                <button type="submit">Submit</button>
            </form>
            <br /> <strong><em>OR</em></strong>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">POST</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">url</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">original</span>: <span class="pl-s">"https://threadxer.cossie.dev/"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="url-shortener-response" class="anchor" aria-hidden="true"
                href="#url-shortener-response"><span aria-hidden="true" class="octicon octicon-link"></span></a>URL
                Shortener Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">201</span> <span class="pl-v">Created</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">original</span>: <span class="pl-s">"https://threadxer.cossie.dev/"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">short</span>: <span class="pl-s">"/api/url/0"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">original</span>: <span class="pl-s">"https://threadxer.cossie.dev/"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">short</span>: <span class="pl-s">"/api/url/0"</span>
                    <span class="pl-kos">{"}"}</span>
                    </pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">400</span> <span class="pl-v">Bad</span> <span class="pl-v">Request</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">error</span>: <span class="pl-s">"Invalid URL"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            {/* <h2><a id="file-metadata" class="anchor" aria-hidden="true" href="#file-metadata"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>File Metadata</h2>
            <h3><a id="file-metadata-request" class="anchor" aria-hidden="true" href="#file-metadata-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>File Metadata Request</h3>
            <form class="single-form" action="/api/metadata" method="post" enctype="multipart/form-data"><input type="file"
                name="file" required /><br /><button type="submit">Submit</button></form> 
            <h3><a id="file-metadata-response" class="anchor" aria-hidden="true"
                href="#file-metadata-response"><span aria-hidden="true" class="octicon octicon-link"></span></a>File
                Metadata Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">originalname</span>: <span class="pl-s">"App.tsx"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">encoding</span>: <span class="pl-s">"7bit"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">mimetype</span>: <span class="pl-s">"text/plain"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">size</span>: <span class="pl-c1">2426</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div> */}
            <h2><a id="quotes-as-a-service" class="anchor" aria-hidden="true" href="#quotes-as-a-service"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Quotes As A Service</h2>
            <h3><a id="quotes-request" class="anchor" aria-hidden="true" href="#quotes-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Quotes Request</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">GET</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">quotes</span><span class="pl-c1">/</span>?<span class="pl-s1">limit</span><span class="pl-c1">=</span><span class="pl-kos">{"{"}</span><span class="pl-kos">{"{"}</span>number<span class="pl-kos">{"}"}</span><span class="pl-kos">{"}"}</span><span>&author<span class="pl-c1">=</span>{"{{author}}&tag={{tag1}}&tag={{tag2}}"}</span></pre>
            </div>
            <h3><a id="quotes-response" class="anchor" aria-hidden="true" href="#quotes-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Quotes Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">quotes</span>: <span class="pl-kos">[</span>
                    <span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">quote</span>: <span class="pl-s">"To iterate is human, to recurse divine."</span><span class="pl-kos">,</span>
                    <span class="pl-c1">author</span>: <span class="pl-s">"Peter Deutsh"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">tags</span>: <span class="pl-kos">[</span>
                    <span class="pl-s">"humor"</span>
                    <span class="pl-kos">]</span>
                    <span class="pl-kos">{"}"}</span>
                    <span class="pl-kos">]</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h2><a id="exercise-tracker" class="anchor" aria-hidden="true" href="#exercise-tracker"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Exercise Tracker</h2>
            <h3><a id="create-user-request" class="anchor" aria-hidden="true" href="#create-user-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Create User Request</h3>
            <form class="single-form" action="/api/exercisetracker" method="post">
                Create New User<input required type="text" name="username" placeholder="username" id="username" /><button
                    type="submit">Submit</button> <br />
                <strong><em>OR</em></strong>
            </form>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">POST</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">exercisetracker</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">username</span>: <span class="pl-s">"John Doe"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="create-user-response" class="anchor" aria-hidden="true" href="#create-user-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Create User Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">201</span> <span class="pl-v">Created</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">username</span>: <span class="pl-s">"John Doe"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">_id</span>: <span class="pl-s">"63b74fd0bbc598b8fa544c5d"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="create-exercise-request" class="anchor" aria-hidden="true"
                href="#create-exercise-request"><span aria-hidden="true" class="octicon octicon-link"></span></a>Create
                Exercise Request</h3>
            <form class="single-form" id="exerciseForm" method="post"
                onsubmit={e => {
                    e.preventDefault();
                    const exForm = document.getElementById('exerciseForm') as HTMLFormElement;
                    const input = document.getElementById('exId') as HTMLInputElement
                    exForm.action = `/api/exercisetracker/${input.value}/logs`
                    exForm.submit()
                }}
            >
                Create Exercise
                <input id="exId" type="text" name="_id" placeholder="_id" required /><input type="text" name="description"
                    placeholder="description" required /><input type="number" name="duration" placeholder="duration"
                        required /><input type="text" name="date" placeholder="date" /><button type="submit">Submit</button>
            </form><br />
            <strong><em>OR</em></strong>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">POST</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">exercisetracker</span><span class="pl-c1">/</span>:<span class="pl-s1">_id</span><span class="pl-c1">/</span><span class="pl-s1">logs</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">_id</span>: <span class="pl-s">"63b74fd0bbc598b8fa544c5d"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">duration</span>: <span class="pl-c1">120</span>,
                    <span class="pl-c1">date</span>: <span class="pl-s">"2020-01-01"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">description</span>: <span class="pl-s">"Dodge, dip, duck, dive, dodge"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="create-exercise-response" class="anchor" aria-hidden="true"
                href="#create-exercise-response"><span aria-hidden="true" class="octicon octicon-link"></span></a>Create
                Exercise Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">201</span> <span class="pl-v">Created</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">_id</span>: <span class="pl-s">"63b74fd0bbc598b8fa544c5d"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">username</span>: <span class="pl-s">"John Doe"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">date</span>: <span class="pl-s">"Wed Jan 01 2020"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">description</span>: <span class="pl-s">"Dodge, dip, duck, dive, dodge"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="get-exercise-logs-request" class="anchor" aria-hidden="true"
                href="#get-exercise-logs-request"><span aria-hidden="true" class="octicon octicon-link"></span></a>Get
                Exercise Logs Request</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">GET</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">exercisetracker</span><span class="pl-c1">/</span>:<span class="pl-s1">_id</span><span class="pl-c1">/</span><span class="pl-s1">logs</span>?<span class="pl-s1">to</span><span class="pl-c1">=</span><span class="pl-kos">{"{"}</span><span class="pl-kos">{"{"}</span>date<span class="pl-kos">{"}"}</span><span class="pl-kos">{"}"}</span><span class="pl-c1">&amp;</span><span class="pl-s1">from</span><span class="pl-c1">=</span><span class="pl-kos">{"{"}</span><span class="pl-kos">{"{"}</span>date<span class="pl-kos">{"}"}</span><span class="pl-kos">{"}"}</span><span class="pl-c1">&amp;</span><span class="pl-s1">limit</span><span class="pl-c1">=</span><span class="pl-kos">{"{"}</span><span class="pl-kos">{"{"}</span>number<span class="pl-kos">{"}"}</span><span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="exercise-logs-response" class="anchor" aria-hidden="true"
                href="#exercise-logs-response"><span aria-hidden="true" class="octicon octicon-link"></span></a>Exercise
                Logs Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">_id</span>: <span class="pl-s">"63b74fd0bbc598b8fa544c5d"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">count</span>: <span class="pl-c1">1</span><span class="pl-kos">,</span>
                    <span class="pl-c1">username</span>: <span class="pl-s">"John Doe"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">log</span>: <span class="pl-kos">[</span>
                    <span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">description</span>: <span class="pl-s">"Dodge, dip, duck, dive, dodge"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">duration</span>: <span class="pl-c1">120</span><span class="pl-kos">,</span>
                    <span class="pl-c1">date</span>: <span class="pl-s">"Wed Jan 01 2020"</span>
                    <span class="pl-kos">{"}"}</span>
                    <span class="pl-kos">]</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h2><a id="metric--imperial-converter" class="anchor" aria-hidden="true"
                href="#metric--imperial-converter"><span aria-hidden="true" class="octicon octicon-link"></span></a>Metric /
                Imperial Converter</h2>

            <h3><a id="converter-request" class="anchor" aria-hidden="true" href="#converter-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Converter Request</h3>
            <form class="single-form" id="convertForm" action="/api/converter" method="get"> <input type="text"
                placeholder="1000mi" name="input" /><button type="submit">Submit</button></form><br />
            <strong><em>OR</em></strong>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">GET</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">converter</span>?<span class="pl-s1">input</span><span class="pl-c1">=</span><span class="pl-kos">{"{"}</span><span class="pl-kos">{"{"}</span>input<span class="pl-kos">{"}"}</span><span class="pl-kos">{"}"}</span></pre>
            </div>
            <p>Example</p>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">GET</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">converter</span>?<span class="pl-s1">input</span><span class="pl-c1">=</span><span class="pl-c1">123</span><span class="pl-s1">mi</span></pre>
            </div>
            <p>Supported units: km, mi, L, gal, kg, lbs</p>
            <h3><a id="converter-response" class="anchor" aria-hidden="true" href="#converter-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Converter Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">initNum</span>: <span class="pl-c1">123</span><span class="pl-kos">,</span>
                    <span class="pl-c1">initUnit</span>: <span class="pl-s">"mi"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">returnNum</span>: <span class="pl-c1">197.94882</span><span class="pl-kos">,</span>
                    <span class="pl-c1">returnUnit</span>: <span class="pl-s">"km"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">string</span>: <span class="pl-s">"123 miles converts to 197.94882 kilometers"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h2><a id="british--american-translator" class="anchor" aria-hidden="true"
                href="#british--american-translator"><span aria-hidden="true"
                    class="octicon octicon-link"></span></a>British / American Translator</h2>
            <h3><a id="translator-request" class="anchor" aria-hidden="true" href="#translator-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Translator Request</h3>
            <div id="translateDiv">
                <form class="formColumn" id="translateForm"
                    onsubmit={async e => {
                        e.preventDefault();
                        const text = (document.getElementById('text') as HTMLInputElement)!.value
                        const locale = (document.getElementById('locale') as HTMLInputElement)!.value
                        const res = await fetch('/api/translate', {
                            method: 'POST',
                            body: JSON.stringify({ text, locale }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        const data = await res.json()
                        if (data.translation) {
                            const resultDiv = document.getElementById('translateResult')!
                            resultDiv.innerHTML = data.translation
                        }
                    }}
                >
                    <textarea id="text" cols="30" rows="10" placeholder="lorry bank holiday 1.15" name="text" required> </textarea><select id="locale"
                        name="locale">
                        <option value="british-to-american">British To American</option>
                        <option value="american-to-british">American To British</option>
                    </select><button type="submit">Submit</button></form>
                <div id="translateResult"></div>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">POST</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">translate</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">text</span>: <span class="pl-s">"lorry bank holiday 1.15"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">locale</span>: <span class="pl-s">"british-to-american"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="translator-response" class="anchor" aria-hidden="true" href="#translator-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Translator Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">text</span>: <span class="pl-s">"lorry bank holiday 1.15"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">translation</span>: <span class="pl-s">"&lt;span class=\"translated\"&gt;truck&lt;/span&gt; &lt;span class=\"translated\"&gt;public holiday&lt;/span&gt; &lt;span class=\"translated\"&gt;1:15&lt;/span&gt;"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">400</span> <span class="pl-v">Bad</span> <span class="pl-v">Request</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">error</span>: <span class="pl-s">"Required field(s) missing"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h2><a id="issue-tracker" class="anchor" aria-hidden="true" href="#issue-tracker"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Issue Tracker</h2>
            <h3><a id="add-issue-request" class="anchor" aria-hidden="true" href="#add-issue-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Add Issue Request</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">POST</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">issues</span><span class="pl-c1">/</span>:<span class="pl-s1">project</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-s">"issue_title"</span>: <span class="pl-s">"test"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"issue_text"</span>: <span class="pl-s">"this is a test"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"created_by"</span>: <span class="pl-s">"admin"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"assigned_to"</span>: <span class="pl-s">"admin"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="add-issue-response" class="anchor" aria-hidden="true" href="#add-issue-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Add Issue Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">201</span> <span class="pl-v">Created</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-s">"assigned_to"</span>: <span class="pl-s">"admin"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"status_text"</span>: <span class="pl-s">""</span><span class="pl-kos">,</span>
                    <span class="pl-s">"open"</span>: <span class="pl-c1">true</span><span class="pl-kos">,</span>
                    <span class="pl-s">"_id"</span>: <span class="pl-s">"63b75ef85ca1072dcc0b9b38"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"issue_title"</span>: <span class="pl-s">"test"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"issue_text"</span>: <span class="pl-s">"this is a test"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"created_by"</span>: <span class="pl-s">"admin"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"created_on"</span>: <span class="pl-s">"2023-01-05T23:36:24.644Z"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"updated_on"</span>: <span class="pl-s">"2023-01-05T23:36:24.644Z"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">400</span> <span class="pl-v">Bad</span> <span class="pl-v">Request</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">error</span>: <span class="pl-s">"required field(s) missing"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="update-issue-request" class="anchor" aria-hidden="true" href="#update-issue-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Update Issue Request</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">PUT</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">issues</span><span class="pl-c1">/</span>:<span class="pl-s1">project</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-s">"_id"</span>: <span class="pl-s">"63b75ef85ca1072dcc0b9b38"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"issue_title"</span>: <span class="pl-s">"test"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"issue_text"</span>: <span class="pl-s">"this is a test"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"created_by"</span>: <span class="pl-s">"admin"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"assigned_to"</span>: <span class="pl-s">"admin"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"status_text"</span>: <span class="pl-s">"test complete"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"open"</span>: <span class="pl-c1">false</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="update-issue-response" class="anchor" aria-hidden="true" href="#update-issue-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Update Issue Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-s">"result"</span>: <span class="pl-s">"successfully updated"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"_id"</span>: <span class="pl-s">"63b75ef85ca1072dcc0b9b38"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="delete-issue-request" class="anchor" aria-hidden="true" href="#delete-issue-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Delete Issue Request</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">DELETE</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">issues</span><span class="pl-c1">/</span>:<span class="pl-s1">project</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-s">"_id"</span>: <span class="pl-s">"63b75ef85ca1072dcc0b9b38"</span><span class="pl-kos">,</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="delete-issue-response" class="anchor" aria-hidden="true" href="#delete-issue-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Delete Issue Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">{"{"}</span>
                    <span class="pl-s">"result"</span>: <span class="pl-s">"successfully deleted"</span><span class="pl-kos">,</span>
                    <span class="pl-s">"_id"</span>: <span class="pl-s">"63b75ef85ca1072dcc0b9b38"</span>
                    <span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="get-issues-request" class="anchor" aria-hidden="true" href="#get-issues-request"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Get Issues Request</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">GET</span> <span class="pl-c1">/</span><span class="pl-s1">api</span><span class="pl-c1">/</span><span class="pl-s1">issues</span><span class="pl-c1">/</span>:<span class="pl-s1">project</span>?<span class="pl-s1">created_by</span><span class="pl-c1">=</span><span class="pl-kos">{"{"}</span><span class="pl-kos">{"{"}</span>creator<span class="pl-kos">{"}"}</span><span class="pl-kos">{"}"}</span><span class="pl-c1">&amp;</span><span class="pl-s1">assigned_to</span><span class="pl-c1">=</span><span class="pl-kos">{"{"}</span><span class="pl-kos">{"{"}</span>person<span class="pl-kos">{"}"}</span><span class="pl-kos">{"}"}</span><span class="pl-c1">&amp;</span><span class="pl-s1">open</span><span class="pl-c1">=</span><span class="pl-kos">{"{"}</span><span class="pl-kos">{"{"}</span>boolean<span class="pl-kos">{"}"}</span><span class="pl-kos">{"}"}</span></pre>
            </div>
            <h3><a id="get-issues-response" class="anchor" aria-hidden="true" href="#get-issues-response"><span
                aria-hidden="true" class="octicon octicon-link"></span></a>Get Issues Response</h3>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-c1">200</span> <span class="pl-v">Ok</span></pre>
            </div>
            <div class="highlight highlight-source-js">
                <pre><span class="pl-kos">[</span>
                    <span class="pl-kos">{"{"}</span>
                    <span class="pl-c1">_id</span>: <span class="pl-s">"63b75ef85ca1072dcc0b9b38"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">issue_title</span>: <span class="pl-s">"test"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">issue_text</span>: <span class="pl-s">"this is a test"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">created_by</span>: <span class="pl-s">"admin"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">assigned_to</span>: <span class="pl-s">"admin"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">status_text</span>: <span class="pl-s">"test complete"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">created_on</span>: <span class="pl-s">"2023-01-05T23:36:24.644Z"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">updated_on</span>: <span class="pl-s">"2023-01-06T00:10:58.852Z"</span><span class="pl-kos">,</span>
                    <span class="pl-c1">open</span>: <span class="pl-c1">false</span><span class="pl-kos">,</span>
                    <span class="pl-c1">__v</span>: <span class="pl-c1">0</span>
                    <span class="pl-kos">{"}"}</span>
                    <span class="pl-kos">]</span></pre>
            </div>

        </main>
    )
}