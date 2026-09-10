FROM ubuntu:24.04

ARG RUNNER_VERSION=2.337.0
ARG TARGETARCH=amd64

ENV DEBIAN_FRONTEND=noninteractive \
    RUNNER_ALLOW_RUNASROOT=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      git \
      gnupg \
      jq \
      python3 \
      tar \
      unzip \
      zip \
    && rm -rf /var/lib/apt/lists/*

# Visual Review expects a Chrome executable at /usr/bin/google-chrome.
RUN install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://dl.google.com/linux/linux_signing_key.pub \
      | gpg --dearmor -o /etc/apt/keyrings/google-chrome.gpg \
    && chmod a+r /etc/apt/keyrings/google-chrome.gpg \
    && echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google-chrome.gpg] https://dl.google.com/linux/chrome/deb/ stable main" \
      > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/actions-runner

RUN test "$TARGETARCH" = "amd64" \
    && curl -fsSL \
      "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz" \
      | tar -xz \
    && ./bin/installdependencies.sh

COPY entrypoint.sh /usr/local/bin/runner-entrypoint
RUN chmod +x /usr/local/bin/runner-entrypoint \
    && mkdir -p /runner-state /opt/actions-runner/_work

ENTRYPOINT ["/usr/local/bin/runner-entrypoint"]
