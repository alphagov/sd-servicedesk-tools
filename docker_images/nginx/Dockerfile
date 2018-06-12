# set nginx base image
FROM nginx:latest

# File Author / Maintainer
LABEL maintainer="adrian.durran@digital.cabinet-office.gov.uk"

# Delete the default configuration
RUN rm -v /etc/nginx/nginx.conf

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf